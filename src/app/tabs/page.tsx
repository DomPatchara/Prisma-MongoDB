// Server side fetching

import React from 'react'
import AddTabs from '../components/AddTabs'
import TabsList from '../components/TabsList'


const getData = async() => {
  const res = await fetch("http://localhost:3000/api/tabs", { cache: 'no-store'}); //no-store --> Always fetch fresh data.

  if(!res.ok) {
    throw new Error("Failed to fetch data")
  }

  return res.json();
}

const TabsPage = async () => {

  const tabs = await getData();

  return (
    <div className='max-w-4xl mx-auto mt-4'>
      <div className='my-5 flex flex-col gap-4'>
          <h1 className='text-3xl font-bold'>All Tabs</h1>
          <AddTabs/>
      </div>

      <TabsList tabs={tabs}/>      
    </div>
  )
}

export default TabsPage