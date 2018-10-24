import React, { Component } from 'react';
import { LocaleProvider } from 'antd';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";

import zhCN from 'antd/lib/locale-provider/zh_CN';
import './App.css';
import configureStore from './redux/ConfigureStore';
import RouteMap from './pages/_RouteMap';
import RouterApp from './RouterApp';

class App extends Component {
	render() {
		return (
			<LocaleProvider locale={zhCN}>
				<Provider store={configureStore()}>
					<RouterApp />
				</Provider>
			</LocaleProvider>
		);
	}
}

export default App;
