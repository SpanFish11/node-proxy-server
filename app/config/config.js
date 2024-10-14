import dotenv from 'dotenv'

dotenv.config({ path: '../.env' })

const config = {
  port: process.env.PORT || 3000,
  apiUrl: process.env.NASSA_API_URL,
  apiKey: process.env.API_KEY,
  startDate: process.env.START_DATE,
  endDate: process.env.END_DATE
}

export default config
