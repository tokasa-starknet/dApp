import { PrismaClient, PROPERTY_STATUS } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function main() {

const properties = [
    {
      owner_id: uuidv4().substring(0, 12),
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
      registration_tx_hash: '0x81D7656EC7ab88b098defB751B7401B5f6d8976G',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      owner_id: uuidv4().substring(0, 12),
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
      registration_tx_hash: '0x91E7656EC7ab88b098defB751B7401B5f6d8976H',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      owner_id: uuidv4().substring(0, 12),
      title: 'Chic Condo in Brooklyn Heights',
      description: 'Renovated condo with modern finishes and river views',
      address: '101 Clark St, Brooklyn, NY 11201',
      latitude: 40.6954,
      longitude: -73.9933,
      area_sqm: 78.9,
      amenities: ['laundry room', 'bike storage', 'common garden'],
      estimated_value: 650000.00,
      tokenization_percentage: 50.0,
      total_tokens: 325000,
      price_per_token: 0.50,
      verification_status: PROPERTY_STATUS.Verified,
      legal_docs_hash: 'QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6ucQ',
      metadata_ipfs_hash: 'QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdL',
      registration_tx_hash: '0x01F7656EC7ab88b098defB751B7401B5f6d8976I',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      owner_id: uuidv4().substring(0, 12),
      title: 'Historic Townhouse in Greenwich Village',
      description: 'Charming 19th century townhouse with original details',
      address: '22 Jones St, New York, NY 10014',
      latitude: 40.7336,
      longitude: -74.0027,
      area_sqm: 185.0,
      amenities: ['private backyard', 'fireplace', 'home office'],
      estimated_value: 950000.00,
      tokenization_percentage: 30.0,
      total_tokens: 285000,
      price_per_token: 0.95,
      verification_status: PROPERTY_STATUS.Rejected,
      legal_docs_hash: 'QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6ucR',
      metadata_ipfs_hash: 'QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdM',
      registration_tx_hash: '0x11G7656EC7ab88b098defB751B7401B5f6d8976J',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      owner_id: uuidv4().substring(0, 12),
      title: 'Waterfront Apartment in Long Island City',
      description: 'Contemporary apartment with stunning East River views',
      address: '45-50 Center Blvd, Queens, NY 11109',
      latitude: 40.7479,
      longitude: -73.9587,
      area_sqm: 110.4,
      amenities: ['pool', 'parking', 'pet-friendly'],
      estimated_value: 880000.00,
      tokenization_percentage: 45.0,
      total_tokens: 396000,
      price_per_token: 0.75,
      verification_status: PROPERTY_STATUS.Verified,
      legal_docs_hash: 'QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6ucS',
      metadata_ipfs_hash: 'QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdN',
      registration_tx_hash: '0x21H7656EC7ab88b098defB751B7401B5f6d8976K',
      created_at: new Date(),
      updated_at: new Date()
    }
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