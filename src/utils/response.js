const response = (responseObject, data, code) => {
  const res = responseObject;
  if (typeof data === 'string') {
    return res.status(code).json({
      status: code,
      error: `${data}`,
      success: false,
    });
  }
  return res.status(code).json({
    status: code,
    data,
    success: true,
  });
};

export default response;
