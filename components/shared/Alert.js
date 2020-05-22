const Alert = ({ type, message }) => {
  const classAlert = `alert alert-${type}`;
  return (
    <div className={classAlert} role="alert">
      {message}
    </div>
  );
};

export default Alert;
