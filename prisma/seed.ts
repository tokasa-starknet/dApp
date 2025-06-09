import { PrismaClient, PROPERTY_STATUS } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.property.deleteMany({});
  await prisma.owner.deleteMany({});
  await prisma.investor.deleteMany({});

  // Seed Owners
  const owners = await prisma.$transaction([
    prisma.owner.create({
      data: {
        wallet_address: '0xowner1',
        full_name: 'Alice Rivera',
        email: 'alice@tokasa.com',
        phone_number: '88887777',
        nationality: 'Costa Rican',
        date_of_birth: new Date('1985-03-15'),
        kyc_doc_hash: 'QmABC123owner1',
        registration_tx_hash: '0xOWNER1TXHASH',
      }
    }),
    prisma.owner.create({
      data: {
        wallet_address: '0xowner2',
        full_name: 'Bob Nakamoto',
        email: 'bob@tokasa.com',
        phone_number: '89998888',
        nationality: 'Japanese',
        date_of_birth: new Date('1979-09-01'),
        kyc_doc_hash: 'QmABC123owner2',
        registration_tx_hash: '0xOWNER2TXHASH',
      }
    })
  ]);

  // Seed Properties (relacionados con los Owners)
  const properties = [
    {
      owner_id: owners[0].id,
      title: 'Modern Loft in Manhattan',
      description: 'Spacious loft with industrial design and city views',
      address: '456 Broadway, New York, NY 10013',
      latitude: 40.7209,
      longitude: -74.0007,
      area_sqm: 92.3,
      amenities: ['rooftop terrace', 'fitness center', '24/7 security'],
      estimated_value: 825000.00,
      tokenization_percentage: 35.0,
      total_tokens: 350000,
      price_per_token: 0.85,
      verification_status: PROPERTY_STATUS.Verified,
      legal_docs_hash: 'QmRzT9J9fZ4vKqYwvXHJnKq3WKnFiJnKLwHCnL72vedxjQk',
      metadata_ipfs_hash: 'QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdH',
      registration_tx_hash: '0x81D7656EC7ab88b098defB751B7401B5f6d8976G'
    },
    {
      owner_id: owners[1].id,
      title: 'Luxury Penthouse in Midtown',
      description: 'Elegant penthouse with panoramic cityscape views',
      address: '789 5th Ave, New York, NY 10019',
      latitude: 40.7639,
      longitude: -73.9724,
      area_sqm: 145.7,
      amenities: ['private elevator', 'smart home system', 'concierge'],
      estimated_value: 1200000.00,
      tokenization_percentage: 25.0,
      total_tokens: 300000,
      price_per_token: 1.00,
      verification_status: PROPERTY_STATUS.Pending,
      legal_docs_hash: 'QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6ucP',
      metadata_ipfs_hash: 'QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdK',
      registration_tx_hash: '0x91E7656EC7ab88b098defB751B7401B5f6d8976H'
    }
  ];

  for (const property of properties) {
    await prisma.property.create({ data: property });
  }

  // Seed Investors
  await prisma.investor.createMany({
    data: [
      {
        wallet_address: '0xinvestor1',
        full_name: 'Investor One',
        email: 'investor1@tokasa.com',
        kyc_status: 'Verified'
      },
      {
        wallet_address: '0xinvestor2',
        full_name: 'Investor Two',
        email: 'investor2@tokasa.com',
        kyc_status: 'Pending'
      }
    ]
  });

  console.log('✅ Seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
