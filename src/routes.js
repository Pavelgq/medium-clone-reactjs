import React from 'react'
import {Switch, Route} from 'react-router-dom'

import GlobalFeed from '@pages/globalFeed/globalFeed'
import Articles from '@pages/article/article';
import Authentication from '@pages/authentication/authentication';
import TagFeed from '@pages/tagFeed/tagFeed'
import YourFeed from '@pages/yourFeed/yourFeed'
import CreateArticle from '@pages/createArticle/createArticle';
import EditArticle from '@pages/editArticle/editArticle';
import Settings from '@pages/settings/settings';
import UserProfile from '@pages/userProfile/userProfile';

const Routes = () => (
  <Switch>
    <Route path='/' component={GlobalFeed} exact />
    <Route path='/profiles/:slug/' component={UserProfile} />
    <Route path='/profiles/:slug/favorite' component={UserProfile} />
    <Route path='/settings' component={Settings} />
    <Route path='/article/new' component={CreateArticle} />
    <Route path='/articles/:slug/edit' component={EditArticle} />
    <Route path='/feed' component={YourFeed} />
    <Route path='/tag/:slug' component={TagFeed} />
    <Route path='/login' component={Authentication} />
    <Route path='/register' component={Authentication} />
    <Route path='/articles/:slug' component={Articles} />
  </Switch>
    )

export default Routes