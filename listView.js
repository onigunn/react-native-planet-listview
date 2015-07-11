/**
 * Planet ListView - loads Image of the day from the Nasa RSS Feed
 *
 *
 * Copyright (c) 2015 Onur Guengoeren
 */

'use strict';

var STATIC_DATA = [
	{title: 'Hubble Looks at Stunning Spiral', description: 'This little-known galaxy, officially named J04542829-6625280, but most often referred to as LEDA 89996, is a classic example of a spiral galaxy.', enclosure: 'http://www.nasa.gov/sites/default/files/thumbnails/image/hubble_friday_07102015.jpg'},
	{title: 'January 19, 2006: New Horizons Launches for Pluto', description: 'On Jan. 19, 2006, Clouds part as NASA’s New Horizons spacecraft roars into the blue sky after an on-time liftoff at 2 p.m. EST aboard an Atlas V rocket from Complex 41 on Cape Canaveral Air Force Station in Florida.', enclosure: 'http://www.nasa.gov/sites/default/files/thumbnails/image/new_horizons_launch.jpg'},

];

var RSS_URL = 'http://www.nasa.gov/rss/dyn/lg_image_of_the_day.rss';

var React = require('react-native');
var {
	Image,
	StyleSheet,
	Text,
	View,
	ListView
} = React;

var PlanetListView = React.createClass({

	getInitialState: function() {
		var dataSource = new ListView.DataSource({
			rowHasChanged: (row1, row2) => row1 !== row2
		});
		return {
			dataSource: dataSource,
			loaded: false
		};
	},

	componentDidMount: function() {
		this.loadRssFeed();
	},

	loadRssFeed: function() {
		this.updateDataSource(STATIC_DATA);
	},

	updateDataSource: function(newData) {
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(newData),
			loaded: true,
		});
	},

	progressView: function() {
		return (
			<View style={styles.container}>
				<Text>Loading Image of the day...</Text>
			</View>
		)
	},

	renderArticle: function(article) {
		return (
			<View style={styles.container}>
				<View style={styles.cellContent}>
					<Image 
						style={styles.enclosure}
						source={{uri:article.enclosure}} 
						resizeMode={Image.resizeMode.cover}
						/>	
					<Text style={styles.title}>{article.title}</Text>
				</View>
			</View>
		);
	},

	render: function() {
		if (this.state.loaded) {
			return (
				<ListView
					dataSource={this.state.dataSource}
					renderRow={this.renderArticle}
					style={{marginTop: 25}} 
				/>
			);
		} else {
			return this.progressView();
		}
	},
});

var styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		padding: 25,
		marginRight: 10,
		marginLeft: 10,
		marginBottom: 15,
		backgroundColor: '#e2e2e2',
	},
	cellContent: {
		flex: 1,
	},
	title: {
		fontSize: 20,
		marginBottom: 16,
	},
	enclosure: {
		width: 300,
		height: 250,
		marginBottom: 16
	}
});

module.exports = PlanetListView;