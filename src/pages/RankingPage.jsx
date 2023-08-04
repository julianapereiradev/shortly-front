import { useContext } from "react"
import AuthContext from "../contexts/AuthContext"
import Header from "../components/Header"
import RankingTable from "../components/RankingTable"

export default function RankingPage() {

    const { user, setUser, userName, setUserName } = useContext(AuthContext)
    
    return (
        <div>
            <h1>Pagina de ranking</h1>
            {user ? 
            (
            <>
            <Header />
            <RankingTable />
            </>
            )
            : 
            (
            <>
            <Header />
            <RankingTable />
            <div>Crie uma conta para usar nosso serviço!</div>
            </>
            )}
        </div>
    )
}