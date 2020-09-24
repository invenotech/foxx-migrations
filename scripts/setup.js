'use strict';
/**
 * Initial Collection Setup
 */
const { db } = require('@arangodb');

if (!db._collection('migrations')) {
  db._createDocumentCollection('migrations');
}

const migrations = db._collection('migrations');

migrations.ensureIndex({
  type: 'hash',
  unique: true,
  fields: ['name']
});
