import React, { useEffect, useState } from "react";
import SectionForm from "../components/UI/SectionForm/SectionForm";
import SectionPreview from "../components/UI/SectionPreview/SectionPreview";
import SectionUsers from "../components/UI/SectionUsers/SectionUsers";
import UsersServise from "../common/fetchAPI/usersServise";
import { useFetching } from "../common/hooks/useFetching";

const MainPage = () => {

  const [url, setUrl] = useState('https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6')
  const [nextUrl, setNextUrl] = useState('')
  const [users, setUsers] = useState([])
  const [positions, setPositions] = useState([])

  const [fetchingUsers, isLoading] = useFetching(async () => {
    const result = await UsersServise.getAllUsers(url)
    url ? setUsers([...users, ...result.users]) : setUsers([...result.users])
    setNextUrl(result.links.next_url)
  })

  useEffect(() => {
    fetchingUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url])


  const [fetchRadioButton, isLoadingRadio] = useFetching(async () => {
    const resultPosition = await UsersServise.getPositions()
    setPositions(resultPosition)
  })

  useEffect(() => {
    fetchRadioButton()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className="main-page">
      <SectionPreview />
      <SectionUsers users={users} setUrl={setUrl} nextUrl={nextUrl} loading={isLoading} />
      <SectionForm setUrl={setUrl} positions={positions} isLoadingRadio={isLoadingRadio}  />
    </main>
  )
}

export default MainPage