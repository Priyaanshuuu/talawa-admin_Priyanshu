// Have a look on the test sir please

import React from 'react';
import { describe, it, expect } from 'vitest';
import {
  mockUserId,
  mockUserName,
  mockOrganizationId,
  mockOrganizationName,
  organizationDataMock,
  logoutMock,
  mockNavigationLinksBase,
  getMockIcon,
  organizationDataErrorMock,
  logoutErrorMock,
  logoutNetworkErrorMock,
  organizationDataNullMock,
} from './UserPortalNavigationBarMocks';
import { GET_ORGANIZATION_BASIC_DATA } from 'GraphQl/Queries/Queries';
import { LOGOUT_MUTATION } from 'GraphQl/Mutations/mutations';

describe('UserPortalNavigationBarMocks - Constants', () => {
  it('exports mockUserId as non-empty string', () => {
    expect(typeof mockUserId).toBe('string');
    expect(mockUserId.length).toBeGreaterThan(0);
    expect(mockUserId).toBe('test-user-123');
  });

  it('exports mockUserName as non-empty string', () => {
    expect(typeof mockUserName).toBe('string');
    expect(mockUserName.length).toBeGreaterThan(0);
    expect(mockUserName).toBe('Test User');
  });

  it('exports mockOrganizationId as non-empty string', () => {
    expect(typeof mockOrganizationId).toBe('string');
    expect(mockOrganizationId.length).toBeGreaterThan(0);
    expect(mockOrganizationId).toBe('org-123');
  });

  it('exports mockOrganizationName as non-empty string', () => {
    expect(typeof mockOrganizationName).toBe('string');
    expect(mockOrganizationName.length).toBeGreaterThan(0);
    expect(mockOrganizationName).toBe('Test Organization');
  });
});

describe('UserPortalNavigationBarMocks - getMockIcon Factory Function', () => {
  it('returns a function when called with "home"', () => {
    const homeIcon = getMockIcon('home');
    expect(typeof homeIcon).toBe('function');
  });

  it('returns a function when called with "permIdentity"', () => {
    const permIdentityIcon = getMockIcon('permIdentity');
    expect(typeof permIdentityIcon).toBe('function');
  });

  it('home icon renders with correct test id', () => {
    const HomeIcon = getMockIcon('home');
    const element = HomeIcon({});

    expect(React.isValidElement(element)).toBe(true);
    if (React.isValidElement(element)) {
      expect((element.props as Record<string, unknown>)['data-testid']).toBe(
        'mock-home-icon',
      );
    }
  });

  it('home icon renders with correct content', () => {
    const HomeIcon = getMockIcon('home');
    const element = HomeIcon({});

    if (React.isValidElement(element)) {
      expect((element.props as Record<string, unknown>).children).toBe(
        'Home Icon',
      );
    }
  });

  it('permIdentity icon renders with correct content', () => {
    const PermIdentityIcon = getMockIcon('permIdentity');
    const element = PermIdentityIcon({});

    expect(React.isValidElement(element)).toBe(true);
    if (React.isValidElement(element)) {
      expect((element.props as Record<string, unknown>).children).toBe(
        'Person Icon',
      );
    }
  });

  it('returned functions are consistent on multiple calls', () => {
    const homeIcon1 = getMockIcon('home');
    const homeIcon2 = getMockIcon('home');

    expect(typeof homeIcon1).toBe('function');
    expect(typeof homeIcon2).toBe('function');

    const element1 = homeIcon1({});
    const element2 = homeIcon2({});

    if (React.isValidElement(element1) && React.isValidElement(element2)) {
      expect((element1.props as Record<string, unknown>)['data-testid']).toBe(
        (element2.props as Record<string, unknown>)['data-testid'],
      );
      expect((element1.props as Record<string, unknown>).children).toBe(
        (element2.props as Record<string, unknown>).children,
      );
    }
  });

  it('accepts HTML attributes as props', () => {
    const HomeIcon = getMockIcon('home');
    const attrs = { className: 'test-class', id: 'test-id' };
    const element = HomeIcon(attrs);

    if (React.isValidElement(element)) {
      expect((element.props as Record<string, unknown>).className).toBe(
        'test-class',
      );
      expect((element.props as Record<string, unknown>).id).toBe('test-id');
    }
  });
});

describe('UserPortalNavigationBarMocks - organizationDataMock', () => {
  it('has request property with query', () => {
    expect(organizationDataMock.request).toBeDefined();
    expect(organizationDataMock.request.query).toBeDefined();
    expect(organizationDataMock.request.query).toBe(
      GET_ORGANIZATION_BASIC_DATA,
    );
  });

  it('has request variables with correct organization id', () => {
    expect(organizationDataMock.request.variables).toBeDefined();
    expect(organizationDataMock.request.variables.id).toBe(mockOrganizationId);
  });

  it('has result property with organization data', () => {
    expect(organizationDataMock.result).toBeDefined();
    expect(organizationDataMock.result.data).toBeDefined();
    expect(organizationDataMock.result.data.organization).toBeDefined();
  });

  it('organization data has correct structure', () => {
    const org = organizationDataMock.result.data.organization;

    expect(org.id).toBe(mockOrganizationId);
    expect(org.name).toBe(mockOrganizationName);
    expect(org.__typename).toBe('Organization');
  });

  it('does not have error property', () => {
    expect('error' in organizationDataMock).toBe(false);
  });
});

describe('UserPortalNavigationBarMocks - logoutMock', () => {
  it('has request property with LOGOUT_MUTATION', () => {
    expect(logoutMock.request).toBeDefined();
    expect(logoutMock.request.query).toBe(LOGOUT_MUTATION);
  });

  it('has variableMatcher function that returns true', () => {
    expect(typeof logoutMock.variableMatcher).toBe('function');
    expect(logoutMock.variableMatcher()).toBe(true);
  });

  it('variableMatcher returns true for any input', () => {
    expect(logoutMock.variableMatcher()).toBe(true);
  });

  it('has result property with logout success data', () => {
    expect(logoutMock.result).toBeDefined();
    expect(logoutMock.result.data).toBeDefined();
    expect(logoutMock.result.data.logout).toBeDefined();
    expect(logoutMock.result.data.logout.success).toBe(true);
  });

  it('does not have error property', () => {
    expect('error' in logoutMock).toBe(false);
  });
});

describe('UserPortalNavigationBarMocks - mockNavigationLinksBase', () => {
  it('is an array', () => {
    expect(Array.isArray(mockNavigationLinksBase)).toBe(true);
  });

  it('contains three navigation links', () => {
    expect(mockNavigationLinksBase.length).toBe(3);
  });

  it('first link has home properties', () => {
    const homeLink = mockNavigationLinksBase[0];

    expect(homeLink.id).toBe('home');
    expect(homeLink.label).toBe('Home');
    expect(homeLink.path).toBe('/home');
  });

  it('second link has campaigns properties with translation key', () => {
    const campaignsLink = mockNavigationLinksBase[1];

    expect(campaignsLink.id).toBe('campaigns');
    expect(campaignsLink.label).toBe('Campaigns');
    expect(campaignsLink.path).toBe('/campaigns');
    expect(campaignsLink.translationKey).toBe('userNavbar.campaigns');
  });

  it('third link has events properties', () => {
    const eventsLink = mockNavigationLinksBase[2];

    expect(eventsLink.id).toBe('events');
    expect(eventsLink.label).toBe('Events');
    expect(eventsLink.path).toBe('/events');
  });

  it('all links have required properties', () => {
    mockNavigationLinksBase.forEach((link) => {
      expect(link.id).toBeDefined();
      expect(typeof link.id).toBe('string');
      expect(link.id.length).toBeGreaterThan(0);

      expect(link.label).toBeDefined();
      expect(typeof link.label).toBe('string');
      expect(link.label.length).toBeGreaterThan(0);

      expect(link.path).toBeDefined();
      expect(typeof link.path).toBe('string');
      expect(link.path.startsWith('/')).toBe(true);
    });
  });

  it('translation key is present only in campaigns link', () => {
    const homeLink = mockNavigationLinksBase[0];
    const campaignsLink = mockNavigationLinksBase[1];
    const eventsLink = mockNavigationLinksBase[2];

    expect(homeLink.translationKey).toBeUndefined();
    expect(campaignsLink.translationKey).toBeDefined();
    expect(eventsLink.translationKey).toBeUndefined();
  });

  it('all link ids are unique', () => {
    const ids = mockNavigationLinksBase.map((link) => link.id);
    const uniqueIds = new Set(ids);

    expect(ids.length).toBe(uniqueIds.size);
  });
});

describe('UserPortalNavigationBarMocks - organizationDataErrorMock', () => {
  it('has request property with query', () => {
    expect(organizationDataErrorMock.request).toBeDefined();
    expect(organizationDataErrorMock.request.query).toBe(
      GET_ORGANIZATION_BASIC_DATA,
    );
  });

  it('has request variables with correct organization id', () => {
    expect(organizationDataErrorMock.request.variables).toBeDefined();
    expect(organizationDataErrorMock.request.variables.id).toBe(
      mockOrganizationId,
    );
  });

  it('has error property that is an Error instance', () => {
    expect(organizationDataErrorMock.error).toBeDefined();
    expect(organizationDataErrorMock.error instanceof Error).toBe(true);
  });

  it('error message indicates organization data fetch failure', () => {
    expect(organizationDataErrorMock.error.message).toContain(
      'Failed to fetch organization data',
    );
  });

  it('does not have result property', () => {
    expect('result' in organizationDataErrorMock).toBe(false);
  });
});

describe('UserPortalNavigationBarMocks - logoutErrorMock', () => {
  it('has request property with LOGOUT_MUTATION', () => {
    expect(logoutErrorMock.request).toBeDefined();
    expect(logoutErrorMock.request.query).toBe(LOGOUT_MUTATION);
  });

  it('has variableMatcher function that returns true', () => {
    expect(typeof logoutErrorMock.variableMatcher).toBe('function');
    expect(logoutErrorMock.variableMatcher()).toBe(true);
  });

  it('has error property that is an Error instance', () => {
    expect(logoutErrorMock.error).toBeDefined();
    expect(logoutErrorMock.error instanceof Error).toBe(true);
  });

  it('error message indicates logout failure', () => {
    expect(logoutErrorMock.error.message).toContain('Failed to logout');
  });

  it('does not have result property', () => {
    expect('result' in logoutErrorMock).toBe(false);
  });
});

describe('UserPortalNavigationBarMocks - logoutNetworkErrorMock', () => {
  it('has request property with LOGOUT_MUTATION', () => {
    expect(logoutNetworkErrorMock.request).toBeDefined();
    expect(logoutNetworkErrorMock.request.query).toBe(LOGOUT_MUTATION);
  });

  it('has variableMatcher function that returns true', () => {
    expect(typeof logoutNetworkErrorMock.variableMatcher).toBe('function');
    expect(logoutNetworkErrorMock.variableMatcher()).toBe(true);
  });

  it('has result property with errors array', () => {
    expect(logoutNetworkErrorMock.result).toBeDefined();
    expect(logoutNetworkErrorMock.result.errors).toBeDefined();
    expect(Array.isArray(logoutNetworkErrorMock.result.errors)).toBe(true);
  });

  it('errors array contains network error with correct structure', () => {
    const errors = logoutNetworkErrorMock.result.errors;

    expect(errors.length).toBeGreaterThan(0);

    const error = errors[0];
    expect(error.message).toBeDefined();
    expect(error.extensions).toBeDefined();
    expect(error.extensions.code).toBe('NETWORK_ERROR');
  });

  it('does not have error property (uses result.errors instead)', () => {
    expect('error' in logoutNetworkErrorMock).toBe(false);
  });
});

describe('UserPortalNavigationBarMocks - organizationDataNullMock', () => {
  it('has request property with query', () => {
    expect(organizationDataNullMock.request).toBeDefined();
    expect(organizationDataNullMock.request.query).toBe(
      GET_ORGANIZATION_BASIC_DATA,
    );
  });

  it('has request variables with correct organization id', () => {
    expect(organizationDataNullMock.request.variables).toBeDefined();
    expect(organizationDataNullMock.request.variables.id).toBe(
      mockOrganizationId,
    );
  });

  it('has result property with null organization data', () => {
    expect(organizationDataNullMock.result).toBeDefined();
    expect(organizationDataNullMock.result.data).toBeDefined();
    expect(organizationDataNullMock.result.data.organization).toBeNull();
  });

  it('does not have error property', () => {
    expect('error' in organizationDataNullMock).toBe(false);
  });
});

describe('UserPortalNavigationBarMocks - Edge Cases', () => {
  it('all exported mocks are objects', () => {
    expect(typeof organizationDataMock).toBe('object');
    expect(typeof logoutMock).toBe('object');
    expect(typeof organizationDataErrorMock).toBe('object');
    expect(typeof logoutErrorMock).toBe('object');
    expect(typeof logoutNetworkErrorMock).toBe('object');
    expect(typeof organizationDataNullMock).toBe('object');
  });

  it('all mocks have truthy request property', () => {
    expect(organizationDataMock.request).toBeTruthy();
    expect(logoutMock.request).toBeTruthy();
    expect(organizationDataErrorMock.request).toBeTruthy();
    expect(logoutErrorMock.request).toBeTruthy();
    expect(logoutNetworkErrorMock.request).toBeTruthy();
    expect(organizationDataNullMock.request).toBeTruthy();
  });

  it('mock constants are not null or undefined', () => {
    expect(mockUserId).not.toBeNull();
    expect(mockUserId).not.toBeUndefined();
    expect(mockUserName).not.toBeNull();
    expect(mockUserName).not.toBeUndefined();
    expect(mockOrganizationId).not.toBeNull();
    expect(mockOrganizationId).not.toBeUndefined();
    expect(mockOrganizationName).not.toBeNull();
    expect(mockOrganizationName).not.toBeUndefined();
  });

  it('getMockIcon returns different functions for different icon types', () => {
    const homeIcon = getMockIcon('home');
    const permIdentityIcon = getMockIcon('permIdentity');

    const homeElement = homeIcon({});
    const permElement = permIdentityIcon({});

    if (
      React.isValidElement(homeElement) &&
      React.isValidElement(permElement)
    ) {
      expect((homeElement.props as Record<string, unknown>).children).not.toBe(
        (permElement.props as Record<string, unknown>).children,
      );
    }
  });

  it('mockNavigationLinksBase is not empty', () => {
    expect(mockNavigationLinksBase.length).toBeGreaterThan(0);
  });

  it('organization data mock and null mock have same request structure', () => {
    expect(organizationDataMock.request.query).toBe(
      organizationDataNullMock.request.query,
    );
    expect(organizationDataMock.request.variables.id).toBe(
      organizationDataNullMock.request.variables.id,
    );
  });

  it('logout error mock and network error mock have same request structure', () => {
    expect(logoutErrorMock.request.query).toBe(
      logoutNetworkErrorMock.request.query,
    );
  });
});
