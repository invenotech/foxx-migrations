'use strict';

const { db } = require('@arangodb');

const migrations = db._collection('migrations');

function setup(name, version, stage) {
  let migration = migrations.firstExample({ name });

  if (!migration) {
    migration = migrations.save({
      name,
      version,
      date: Date.now(),
      migrations: stage
    });
    console.log(`Installed ${name} service ${version}`);
  } else {
    const installed = migration.version;

    migration = migrations.update(
      { _key: migration._key },
      {
        version,
        date: Date.now(),
        migrations: {
          ...migration.migrations,
          stage
        }
      }
    );
    console.log(`Upgraded ${name} service from ${installed} to ${version}`);
  }

  return !migration ? false : migration.version;
}

function info(name) {
  let migration = migrations.firstExample({ name });
  return !migration ? false : migration;
}

module.exports = { info, migrations, setup };
