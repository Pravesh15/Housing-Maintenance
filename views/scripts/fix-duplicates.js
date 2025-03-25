const mongoose = require('mongoose');
const User = require('./models/userModel').User;
require('dotenv').config();

async function fixDuplicates() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        
        // Find all duplicates
        const duplicates = await User.aggregate([
            {
                $group: {
                    _id: { 
                        societyName: "$societyName", 
                        flatNumber: "$flatNumber" 
                    },
                    count: { $sum: 1 },
                    docs: { $push: "$_id" }
                }
            },
            {
                $match: {
                    count: { $gt: 1 }
                }
            }
        ]);

        console.log('Found duplicate entries:', duplicates);

        // For each set of duplicates
        for (const dup of duplicates) {
            // Keep the most recent entry (based on last payment or creation date)
            const users = await User.find({
                _id: { $in: dup.docs }
            }).sort({ 'lastPayment.date': -1, 'createdAt': -1 });

            // Keep the first one (most recent) and delete others
            for (let i = 1; i < users.length; i++) {
                console.log(`Removing duplicate user: ${users[i].firstName} ${users[i].lastName} - Flat: ${users[i].flatNumber}`);
                await User.findByIdAndDelete(users[i]._id);
            }
        }

        console.log('Duplicate cleanup completed');
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

fixDuplicates();
