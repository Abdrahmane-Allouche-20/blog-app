import mongoose from 'mongoose'

let initialize = false

export const Connect = async (): Promise<void> => {
    mongoose.set('strictQuery', true)

    if (initialize) {
        console.log('Already connected')
        return
    }

    if (!process.env.MONGO_URI) {
        console.error('❌ MONGO_URI is not defined in the environment variables.')
        return
    }

    try {
        await mongoose.connect(process.env.MONGO_URI)
        initialize = true
        console.log('✅ Connected to the database')
    } catch (error) {
        console.error('❌ Database connection error:', error)
    }
}
