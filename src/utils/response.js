const response = (responseObject, data, code) => {
  const res = responseObject;
  if (code >= 400) {
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
