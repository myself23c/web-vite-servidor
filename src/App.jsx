import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import {Register} from '../pages/RegisterPage'
import { LoginPage } from '../pages/LoginPage'
import { ProfilePage } from '../pages/ProfilePage'
import { TaskPage } from '../pages/TaskPage'
import { HomePage } from '../pages/HomePage'
import {AuthProvider} from "../context/authContext"
import {ProtectedRoute} from "./ProtectedRoute"
import { TwitterCrawlerPage } from '../pages/TwitterCrawlerPage'
import { RedditCrawlerPage } from '../pages/RedditCrawlerPage'
import { FileUploader }  from '../pages/UploadPage'
import { CrawlerDB}  from '../pages/CrawlerDB'
import { URLSubmitter } from '../pages/CrawlerStart' 
//import MusicPlayer from "../components/test-music-player/MusicPlayer"
//import { AudioPlayerProvider } from "../components/test-music-player/AudioPlayerContext";
import { IndexHtmlLoader, VideosHtmlLoader } from '../pages/publicPage';


function App() {
  //const [count, setCount] = useState(0)

  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/"   element={<HomePage></HomePage>}></Route>
        <Route path="/login"   element={<LoginPage></LoginPage>}></Route>
        <Route path="/register"   element={<Register></Register>}></Route>
        <Route path="upload" element={<FileUploader></FileUploader>}></Route>
        <Route path="crawler-db" element={<CrawlerDB></CrawlerDB>}></Route>
        <Route path="crawler-start" element={<URLSubmitter></URLSubmitter>}></Route>
        <Route path="/twitter-crawler" element={<TwitterCrawlerPage></TwitterCrawlerPage>}></Route>
        <Route path= "/reddit-crawler" element={<RedditCrawlerPage></RedditCrawlerPage>}> </Route>
        
        <Route path="/music-player-static" element={<IndexHtmlLoader />}></Route>
        <Route path="/videos-static" element={<VideosHtmlLoader />}></Route>
        <Route element ={<ProtectedRoute></ProtectedRoute>}>
          <Route path="/tasks"   element={<TaskPage/>}></Route>
          <Route path="/add-task"   element={<h1> agregar tarea</h1>}></Route>
          <Route path="/task"   element={<TaskPage></TaskPage>}></Route>
          <Route path="/task/:id"   element={<h1> updatetask</h1>}></Route>
          
          
          <Route path="/profile"   element={<ProfilePage></ProfilePage>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App
