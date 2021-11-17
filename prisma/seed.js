const dbClient = require('../src/utils/dbClient');

async function seed() {
    // If user has no relations to delete, just deleteMany like normal
    await dbClient.user.deleteMany();

    // If user has related records to delete, use a transaction to execute both deletes at the same time
    // https://www.prisma.io/docs/concepts/components/prisma-client/crud#cascading-deletes-deleting-related-records
    const deleteUsers = dbClient.user.deleteMany();
    const deleteProfiles = dbClient.profile.deleteMany();
    await dbClient.$transaction([deleteProfiles, deleteUsers]);

    const users = [];

    // Create 100 users
    let i = 100;
    while (i --> 0) {
        const createdUser = await dbClient.user.create({
            data: {
                username: 'rsanchez',
                profile: {
                    create: {
                        firstName: 'Rick',
                        lastName: 'Sanchez'
                    }
                }
            }
        });

        users.push(createdUser);
    }

    // Create a single user
    const user = await dbClient.user.create({
        data: {
            username: 'rsanchez',
            profile: {
                create: {
                    firstName: 'Rick',
                    lastName: 'Sanchez'
                }
            }
        }
    });

    console.log("Created:", user, users);
}

seed()
    .catch((error) => {
        console.log(error);
    })
    .finally(async () => {
        await dbClient.$disconnect();
        process.exit(0);
    });