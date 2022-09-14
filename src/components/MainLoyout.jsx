import { React, useContext } from 'react'
import { Route, Switch, Redirect} from 'react-router-dom'
import { AllCard } from './books/AllCard'
import { AsideUser } from './user/userHome/AsideUser'
import { Header } from './header/Header'
import { Login } from './forms/Login'
import { Register } from './forms/Register'
import { CardsUserContext } from '../Context/CardsUserProvider'
import { CardAvtors } from './books/avtors/CardAvtors'
import { AddAvtor } from './forms/AddAvtor'
import { ResetPassword } from './forms/ResetPassword'
import { CardBookDatails } from './books/cardDetails/CardBookDatails'
import { Create } from './forms/blockform/Create'
import { Profile } from './user/profile/Profile'

export function MainLoyout () {
  const {user} = useContext(CardsUserContext)
 
  return (
     
        <Header> 
          {
            (user)
            ?
              <Switch>
                <Route path='/book/:id'>
                  <CardBookDatails/>
                </Route>
                <Route path='/user/home'>
                    <AsideUser/>
                </Route>
                <Route path="/user/create">
                  <Create/>
                </Route>
                <Route path="/user/addAvtor">
                  <AddAvtor/>
                </Route>
                <Route path='/user/profile/:id'>
                  <Profile/>
                </Route>
                <Route path='/avtor/:id'>
                  <CardAvtors/>
                </Route>
                <Redirect to='/user/home'/>
              </Switch>
            :
            <Switch>
              <Route path='/book/:id'>
                <CardBookDatails/>
              </Route>
              <Route path='/quest/login'>
                <Login/>
              </Route>
              <Route path="/quest/register">
                <Register/>
              </Route>
              <Route path="/quest/home">
                <AllCard/>
              </Route>
              <Route path="/quest/resetParol">
                <ResetPassword/>
              </Route>
              <Route path='/user/profile/:id'>
                  <Profile/>
              </Route>
              <Route path='/avtor/:id'>
                  <CardAvtors/>
                </Route>
              <Redirect to="/quest/login"/>
            </Switch>
          }
         
        </Header>
    
  )
}
