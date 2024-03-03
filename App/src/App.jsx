import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import SearchResult from './Components/SearchResult/SearchResult';


export const BASE_URL = "http://localhost:9000";

const App = () => {
  const [data, setData] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [FilterData, setFilterData] = useState(null);
  const [slectedBtn, setSelectedBtn] = useState("all")

  useEffect(() => {
    const Fetchfooddata = async () => {
      setLoading(true)
      try {
        const response = await fetch(BASE_URL)
        const json = await response.json()
        setData(json)
        setFilterData(json)
        setLoading(false)

      } catch (error) {
        setError("Unable to fetch data")

      }
    };

    Fetchfooddata();

  }, [])

  const SearchFood = (e) => {
    const searchValue = e.target.value;
    console.log(searchValue);
    if (searchValue === " ") {
      setFilterData(null)
    }
    const filter = data?.filter((food) => food.name.toLowerCase().includes(searchValue.toLowerCase()))
    setFilterData(filter)
  }

  const filtereFood = (type) => {
    if (type === "all") {
      setFilterData(data);
      setSelectedBtn("all")
      return

    }
    const filter = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase()));
    setFilterData(filter)
    setSelectedBtn(type)
  }

  if (error) return <div>{error}</div>
  if (error) return <div>Loading...</div>
  return (
    <>
      <Container>
        <TopContainer>
          <div className="logo">
            <img src="/logo.svg" alt="logo" />
          </div>
          <div className="search">
            <input type="text"
              onChange={SearchFood}
              placeholder='Search Food...'
            />

          </div>
        </TopContainer>

        <FilterContainer>
          <Button onClick={() => filtereFood("all")}>All</Button>
          <Button onClick={() => filtereFood("breakfast")} >Breakfast</Button>
          <Button onClick={() => filtereFood("lunch")} >Lunch</Button>
          <Button onClick={() => filtereFood("dinner")} >Dinner</Button>
        </FilterContainer>

      </Container>
      <SearchResult data={FilterData} />
    </>
  )
}

export default App

export const Container = styled.div`
margin-top: 0px;
max-width: 1288px;
margin: 0 auto;

`
const TopContainer = styled.div`
min-height: 100px;
display: flex;
flex-direction:row;
align-items: center;
justify-content: space-between;

.search{
   input{
    background-color: transparent;
    border: 1px solid red;
    color: white;
    border-radius: 5px;
    height: 30px;
    font-size: 14px;
    padding: 0 10px;
   }
}
`
const FilterContainer = styled.div`
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
column-gap: 10px;
padding-bottom:20px;

  `

export const Button = styled.button`
background: #ff4343;
border-radius: 5px;
padding: 6px 12px;
border: none;
color: white;
font-size: 14px;
cursor: pointer;
&:hover{
  background-color: #cc1c1c
}

`

