import { error } from 'pure-logger';
import { toast } from 'react-toastify';
/**
 * mixin for the on Change HTML inputs
 * @param e
 */
export function onChangeInput(e) {
  e.preventDefault();
  const { data } = this.state;
  data[e.target.name] = e.target.value;
  this.setState({
    data,
  });
}

/**
 * The onChange method for forms
 */
export function onChange(name, value) {
  const data = this.state.data;
  data[name] = value;
  this.setState({ data });
}

/**
 * The onError method for View, shows the error on a Toast
 */
export function onError(err) {
  error(err);
  toast.error(err.message);
}
