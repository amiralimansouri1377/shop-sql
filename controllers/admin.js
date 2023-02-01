exports.getAdminPanel = (req, res, next) => {
  res.render('admin/admin-panel', {
    pageTitle: 'Admin Panel',
    path: '/admin',
  });
};
