import {
  LocalFileSystemDuplexConnector,
  MongoDBDuplexConnector,
  MongoTransferer,
} from 'mongodb-snapshot';

// Mongo connector
const mongo_connector = new MongoDBDuplexConnector({
  connection: {
    uri: `${process.env.MONGODB_URL}`,
    dbname: `${process.env.DATABASE_NAME}`,
    isAtlasFreeTier: true,
  },
});

// Localfile connector
const localfile_connector = new LocalFileSystemDuplexConnector({
  connection: {
    path: `public/backup/2022-11-14T16:37:01-p55product10test.tar`,
  },
});

// Restore
new MongoTransferer({
  source: localfile_connector,
  targets: [mongo_connector],
});

// Processing
for await (const { total, write } of transferer) {
  console.log(`remaining bytes to write: ${total - write}`);
}
