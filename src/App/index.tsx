import React, {Suspense, useState} from 'react';
import {Switch, Route} from 'react-router-dom';

import {Preloader} from '@/components';
import {ProductCategories} from '@/pages';
import {Navigation} from '@/parts';

import styles from './styles.scss';


const App: React.FC = () => {
    const [isNavOpened, setNavOpened] = useState(false);

    return (
        <div className={styles.appContainer}>
            <Navigation isOpen={isNavOpened} />

            <div className={styles.pageContent}>
                <Suspense fallback={Preloader}>
                    <Switch>
                        <Route exact path="/products" component={ProductCategories} />
                    </Switch>
                </Suspense>
            </div>
        </div>
    );
};

export default App;
