import React, {
  Component,
} from 'react';
import {
  StyleSheet,
  View,
  Animated,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

export default class ActionButtonItem extends Component {
  render() {
    if (!this.props.active) return null;

    const offsetX = this.props.radius * Math.cos(this.props.angle);
    const offsetY = this.props.radius * Math.sin(this.props.angle);
    const animationStyles = this.props.displayAnimation ? {
      opacity: this.props.anim,
      transform: [
        {
          translateY: this.props.anim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, offsetY],
          }) },
        {
          translateX: this.props.anim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, offsetX],
          }) },
        {
          rotate: this.props.anim.interpolate({
            inputRange: [0, 1],
            outputRange: [`${this.props.startDegree}deg`, `${this.props.endDegree}deg`],
          }) },
        {
          scale: this.props.anim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          }) },
      ]
    } : { top: offsetY, left: offsetX };

    return (
      <Animated.View
        style={[{
          width: this.props.size,
          height: this.props.size,
        }, animationStyles]}
      >
        <TouchableOpacity
          style={{flex:1}} activeOpacity={this.props.activeOpacity || 0.85}
          onPress={this.props.onPress}
        >
          <View
            style={[styles.actionButton,{
              width: this.props.size,
              height: this.props.size,
              borderRadius: this.props.size / 2,
              backgroundColor: this.props.buttonColor,
            }]}
          >
            {this.props.children}
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

ActionButtonItem.propTypes = {
  angle: PropTypes.number,
  radius: PropTypes.number,
  buttonColor: PropTypes.string,
  onPress: PropTypes.func,
  children: PropTypes.node.isRequired,
  startDegree: PropTypes.number,
  endDegree: PropTypes.number,
  displayAnimation: PropTypes.boolean
};

ActionButtonItem.defaultProps = {
  startDegree: 0,
  endDegree: 720
};

const styles = StyleSheet.create({
  actionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 2,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowColor: '#444',
    shadowRadius: 1,
    backgroundColor: 'red',
    position: 'absolute',
  },
});
