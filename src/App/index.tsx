import React, {Suspense, useEffect} from 'react';
import {Switch, Redirect, Route} from 'react-router-dom';
import {observer} from 'mobx-react-lite';

import {Preloader, AuthenticatedRoute} from '@/components';
import {Navigation} from '@/parts';
import {ProductCategoryPages, ProductPages, LoginPage} from '@/pages';
import {Admin} from '@/admin-lib/components';
import {useHttpContext} from '@/store/ports/http';
import {useUserContext} from '@/store/ports/user';

import styles from './styles.scss';


const App: React.FC = observer(() => {
    const httpService = useHttpContext();
    const userStore = useUserContext();


    useEffect(() => {
        userStore.init();
    }, [userStore]);


    if (!userStore.isUserInitialized) {
        return <Preloader />;
    }

    return (
        <Admin requestProvider={httpService}>
            <div className={styles.appContainer}>
                <Navigation isOpen={true} />

                <div className={styles.pageContent}>
                    <Suspense fallback={Preloader}>
                        <Switch>
                            <Redirect exact from="/" to="/categories" />

                            <AuthenticatedRoute
                                path="/categories"
                                component={ProductCategoryPages}
                            />

                            <AuthenticatedRoute
                                path="/products"
                                component={ProductPages}
                            />

                            <Route path="/login" component={LoginPage} />
                        </Switch>
                    </Suspense>
                </div>
            </div>
        </Admin>
    );
});


export default App;
