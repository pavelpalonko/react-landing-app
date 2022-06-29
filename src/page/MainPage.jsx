import React, { useEffect, useState } from "react";
import SectionForm from "../components/UI/SectionForm/SectionForm";
import SectionPreview from "../components/UI/SectionPreview/SectionPreview";
import SectionUsers from "../components/UI/SectionUsers/SectionUsers";
import { useUsersServiсe } from "../common/fetchAPI/useUsersServiсe";
import { useFetching } from "../common/hooks/useFetching";

const MainPage = () => {

  const UsersService = useUsersServiсe()
  const [users, setUsers] = useState([])
  const [positions, setPositions] = useState([])
  const [showButton, setShowButton] = useState(true)

  const [fetchingUsers, isLoading] = useFetching(async (isRefresh) => {
    const result = await UsersService.getAllUsers(isRefresh)
    setShowButton(result.showBtn)
    isRefresh ? setUsers([...result.users]) : setUsers([...users, ...result.users])
  })

  useEffect(() => {
    fetchingUsers(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [fetchingPositions, isLoadingPositions] = useFetching(async () => {
    const resultPosition = await UsersService.getPositions()
    setPositions(resultPosition)
  })

  useEffect(() => {
    fetchingPositions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className="main-page">
      <SectionPreview />
      <SectionUsers
        users={users}
        loading={isLoading}
        downloadNextUsers={fetchingUsers}
        showButton={showButton}
      />
      <SectionForm
        positions={positions}
        isLoadingPositions={isLoadingPositions}
        downloadNextUsers={fetchingUsers}
      />
    </main>
  )
}

export default MainPage