/**
 * Planet ListView - loads Image of the day from the Nasa RSS Feed
 *
 *
 * Copyright (c) 2015 Onur Guengoeren
 */

'use strict';

var RSS_URL = 'http://www.nasa.gov/rss/dyn/lg_image_of_the_day.rss';

var React = require('react-native');
var {
	Image,
	StyleSheet,
	Text,
	View,
	ListView,
	NativeModules
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
		fetch(RSS_URL)
			.then((response) => response.text())
			.then((text) => {
				NativeModules.OGXmlJsonParser.transformXml(text, (jsonString) => {
					var data = JSON.parse(jsonString);
					this.updateDataSource(data.channel.item);
				});
			})
			.done();
		
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
						source={{uri:article.enclosure._url}} 
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