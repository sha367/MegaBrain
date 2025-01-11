import { Stack } from "@mui/material"
import { Link } from "react-router-dom"

export const AppHeader = () => {
  return (
    <Stack
      gap=".5rem"
      direction='row'
      alignItems='center'
      justifyContent='space-between'
      className="p-4 bg-blue-500 w-full h-12 text-white"
    >
      <h1 className="text-2xl font-bold">
        <Link to="/">MyGenAI</Link>
      </h1>

      <Stack gap=".5rem" direction='row'>
        <Link to="/settings">Settings</Link>
      </Stack>
    </Stack>
  )
}
