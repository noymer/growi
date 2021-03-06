import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import { createSubscribedElement } from '../../UnstatedUtils';
import AppContainer from '../../../services/AppContainer';
import { toastSuccess, toastError } from '../../../util/apiNotification';
import AdminUsersContainer from '../../../services/AdminUsersContainer';

class RemoveAdminButton extends React.Component {

  constructor(props) {
    super(props);

    this.onClickRemoveAdminBtn = this.onClickRemoveAdminBtn.bind(this);
  }

  async onClickRemoveAdminBtn() {
    const { t } = this.props;

    try {
      const username = await this.props.adminUsersContainer.removeUserAdmin(this.props.user._id);
      toastSuccess(t('toaster.remove_user_admin', { username }));
    }
    catch (err) {
      toastError(err);
    }
  }


  renderRemoveAdminBtn() {
    const { t } = this.props;

    return (
      <a role="button" className="px-4" onClick={() => { this.onClickRemoveAdminBtn() }}>
        <i className="icon-fw icon-user-unfollow"></i> {t('admin:user_management.user_table.remove_admin_access')}
      </a>
    );
  }

  renderRemoveAdminAlert() {
    const { t } = this.props;

    return (
      <div className="px-4">
        <i className="icon-fw icon-user-unfollow mb-2"></i>{t('admin:user_management.user_table.remove_admin_access')}
        <p className="alert alert-danger">{t('admin:user_management.user_table.cannot_remove')}</p>
      </div>
    );
  }

  render() {
    const { user } = this.props;
    const me = this.props.appContainer.me;

    return (
      <Fragment>
        {user.username !== me ? this.renderRemoveAdminBtn()
          : this.renderRemoveAdminAlert()}
      </Fragment>
    );
  }

}

/**
* Wrapper component for using unstated
*/
const RemoveAdminButtonWrapper = (props) => {
  return createSubscribedElement(RemoveAdminButton, props, [AppContainer, AdminUsersContainer]);
};

RemoveAdminButton.propTypes = {
  t: PropTypes.func.isRequired, // i18next
  appContainer: PropTypes.instanceOf(AppContainer).isRequired,
  adminUsersContainer: PropTypes.instanceOf(AdminUsersContainer).isRequired,

  user: PropTypes.object.isRequired,
};

export default withTranslation()(RemoveAdminButtonWrapper);
