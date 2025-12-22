import React from 'react'

export async function GET() {
  return Response.json({
    message: 'Server is running properly'
  })
}
