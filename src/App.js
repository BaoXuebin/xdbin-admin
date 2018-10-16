import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { LocaleProvider } from 'antd';
import { Provider } from 'react-redux';

import zhCN from 'antd/lib/locale-provider/zh_CN';
import './App.css';
import configureStore from './redux/ConfigureStore';
import LayoutWrapper from './containers/base/LayoutWrapper';
import Route from './pages/_RouteMap';

const { RouteMap, SimpleRouteMap } = Route;

class App extends Component {
	render() {
		return (
			<LocaleProvider locale={zhCN}>
				<Provider store={configureStore()}>
					<Router>
						<Fragment>
							<SimpleRouteMap />
							<LayoutWrapper>
								<RouteMap />
							</LayoutWrapper>
						</Fragment>
					</Router>
				</Provider>
			</LocaleProvider>
		);
	}
}

export default App;
