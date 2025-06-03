import { PrismaClient, PROPERTY_STATUS } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function main() {

  const properties = [
    {
      owner_id: uuidv4().substring(0, 12),
      title: 'Modern Apartment in Downtown',
      description: 'Luxury apartment with great views',
      address: '123 Main St, New York, NY 10001',
      latitude: 40.7128,
      longitude: -74.0060,
      area_sqm: 85.5,
      amenities: ['pool', 'gym', 'concierge'],
      estimated_value: 750000.00,
      tokenization_percentage: 40.0,
      total_tokens: 400000,
      price_per_token: 0.75,
      verification_status: PROPERTY_STATUS.Verified,
      legal_docs_hash: 'QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco',
      metadata_ipfs_hash: 'QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG',
      registration_tx_hash: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
      created_at: new Date(),
      updated_at: new Date()
    },
  ];

  await prisma.property.deleteMany({});

  for (const property of properties) {
    await prisma.property.create({
      data: property
    });
  }

  console.log('Seed completed!');
}

main();