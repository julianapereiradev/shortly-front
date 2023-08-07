import { useContext } from "react"
import AuthContext from "../contexts/AuthContext"
import Header from "../components/Header"
import RankingTable from "../components/RankingTable"
import RankingLogo from "../components/RankingLogo"
import RankingNotLogged from "../components/RankingNotLogged"

export default function RankingPage() {

    const { user } = useContext(AuthContext)
    
    return (
        <div>
            {user ? 
            (
            <>
            <Header />
            <RankingLogo />
            <RankingTable />
            </>
            )
            : 
            (
            <>
            <Header />
            <RankingLogo />
            <RankingTable />
            <RankingNotLogged />
            </>
            )}
        </div>
    )
}