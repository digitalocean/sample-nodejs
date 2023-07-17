import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      ...errorInfo,
    });
  }

  render() {
    return this.state.error ? (
      <>
        <h1>Something went wrong.</h1>
        <a href="/">
          <h2>Click here to reload</h2>
        </a>
        {Object.entries(this.state).map(([key, value]) => (
          <div style={{ outline: 'solid', padding: '10px' }} key={key}>
            {key} is {value.toString()}
          </div>
        ))}
      </>
    ) : (
      this.props.children
    );
  }
}
