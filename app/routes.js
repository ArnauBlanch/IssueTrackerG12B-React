// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from 'utils/asyncInjectors';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas, checkAuth } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars

  return [
    {
      path: '/',
      name: 'issueListPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/IssueListPage/reducer'),
          import('containers/IssueListPage/sagas'),
          import('containers/IssueListPage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('issueListPage', reducer.default);
          injectSagas('issueListPage', sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/issues/new',
      name: 'newIssuePage',
      onEnter: checkAuth,
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/NewIssuePage/reducer'),
          import('containers/NewIssuePage/sagas'),
          import('containers/NewIssuePage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('newIssuePage', reducer.default);
          injectSagas('newIssuePage', sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/issues/:issueID/edit',
      name: 'editIssuePage',
      onEnter: checkAuth,
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/EditIssuePage/reducer'),
          import('containers/EditIssuePage/sagas'),
          import('containers/EditIssuePage'),
          import('containers/IssueDetailsPage/reducer'),
          import('containers/IssueDetailsPage/sagas'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component, reducer2, sagas2]) => {
          injectReducer('issueDetailsPage', reducer2.default);
          injectSagas('issueDetailsPage', sagas2.default);
          injectReducer('editIssuePage', reducer.default);
          injectSagas('editIssuePage', sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/issues/:issueID',
      name: 'issueDetailsPage',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/IssueDetailsPage/reducer'),
          import('containers/IssueDetailsPage/sagas'),
          import('containers/IssueDetailsPage'),
          import('containers/CommentsSection/reducer'),
          import('containers/CommentsSection/sagas'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component, reducer2, sagas2]) => {
          injectReducer('comments', reducer2.default);
          injectSagas('comments', sagas2.default);
          injectReducer('issueDetailsPage', reducer.default);
          injectSagas('issueDetailsPage', sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
