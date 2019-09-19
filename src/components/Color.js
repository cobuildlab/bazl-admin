import React from 'react';
import reactCSS from 'reactcss';
import { SketchPicker } from 'react-color';
import PropTypes from 'prop-types';

class SketchExample extends React.Component {
  state = {
    displayColorPicker: false,
    background: '#ffffff',
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
    this.props.onChangeColor(this.state.background);
  };

  handleChange = (color) => {
    this.setState({ background: color.hex });
  };

  render() {
    const styles = reactCSS({
      default: {
        color: {
          width: '100px',
          height: '20px',
          borderRadius: '2px',
          background: this.state.background,
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

    return (
      <div>
        <div style={styles.swatch} onClick={this.handleClick}>
          <div style={styles.color} />
        </div>
        {this.state.displayColorPicker ? (
          <div style={styles.popover}>
            <div style={styles.cover} onClick={this.handleClose} />
            <SketchPicker
              color={this.state.background}
              onChange={this.handleChange}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

SketchExample.propTypes = {
  onChangeColor: PropTypes.func.isRequired,
};

export default SketchExample;
