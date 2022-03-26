import Box from "@client/components/Box";
import Button from "@client/components/Button";
import { signOut } from "next-auth/react"

const LogoutPage = () => {
    return (
        <Box title="Logout" description="Are you sure you want to logout?">
            <Button onClick={() => signOut()}>Logout</Button>
        </Box>
    )
}

export default LogoutPage;