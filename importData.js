const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const csv = require('csv-parser');
const cliProgress = require('cli-progress');
const Customer = require('./models/customerModel');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const results = [];
let totalRows = 0;
const BATCH_SIZE = 1000;

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Step 1: Hitung total baris untuk progress bar
fs.createReadStream('Dataset.csv')
  .pipe(csv())
  .on('data', () => totalRows++)
  .on('end', () => {
    importCSV(totalRows);
  });

async function importCSV(total) {
  const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  let successCount = 0;
  let failCount = 0;
  let skippedCount = 0;

  console.log(`\n🔍 Preparing to import ${total} rows...`);
  bar.start(total, 0);

  fs.createReadStream('Dataset.csv')
    .pipe(csv())
    .on('data', (data) => {
      bar.increment();

      // Validasi email
      if (!data['Email'] || !isValidEmail(data['Email'])) {
        skippedCount++;
        return;
      }

      results.push({
        number: Number(data['Number']),
        location: data['Name of Location'],
        date: new Date(data['Date']),
        loginHour: data['Login Hour'],
        name: data['Name'],
        age: Number(data['Age']),
        gender: data['gender'],
        email: data['Email'],
        noTelp: data['No Telp'],
        brandDevice: data['Brand Device'],
        digitalInterest: data['Digital Interest'],
        locationType: data['Location Type'],
      });
    })
    .on('end', async () => {
      bar.stop();
      console.log(`\n🚀 Starting database import... (Valid rows: ${results.length}, Skipped: ${skippedCount})`);

      for (let i = 0; i < results.length; i += BATCH_SIZE) {
        const batch = results.slice(i, i + BATCH_SIZE);
        try {
          await Customer.insertMany(batch, { ordered: false });
          successCount += batch.length;
        } catch (err) {
          const failed = err?.writeErrors?.length || 0;
          successCount += batch.length - failed;
          failCount += failed;
          console.error(`⚠️ Batch ${i / BATCH_SIZE + 1} error: ${failed} failed.`);
        }

        console.log(`✅ Inserted up to ${Math.min(i + BATCH_SIZE, results.length)} of ${results.length}`);
      }

      console.log('\n📦 Import Summary:');
      console.log(`  ✅ Success    : ${successCount}`);
      console.log(`  ❌ Failed     : ${failCount}`);
      console.log(`  ⚠️ Skipped    : ${skippedCount} (invalid email)`);

      process.exit(failCount > 0 ? 1 : 0);
    });
}
