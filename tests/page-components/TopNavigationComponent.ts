import { Page, Locator } from '@playwright/test';

/**
 * TopNavigationComponent - Reusable navigation component
 * Can be composed into any Page Object that has a top navigation bar
 */
export class TopNavigationComponent {
  readonly page: Page;
  
  // Navigation locators
  readonly docsLink: Locator;
  readonly apiLink: Locator;
  readonly communityLink: Locator;
  readonly searchButton: Locator;
  
  constructor(page: Page) {
    this.page = page;
    
    // Initialize locators using accessibility-first approach
    this.docsLink = page.getByRole('link', { name: 'Docs' });
    this.apiLink = page.getByRole('link', { name: 'API', exact: true });
    this.communityLink = page.getByRole('link', { name: 'Community' });
    this.searchButton = page.getByRole('button', { name: 'Search' });
  }
  
  /**
   * Navigate to Docs page
   */
  async navigateToDocs() {
    await this.docsLink.click();
  }
  
  /**
   * Navigate to API page
   */
  async navigateToAPI() {
    await this.apiLink.click();
  }
  
  /**
   * Navigate to Community page
   */
  async navigateToCommunity() {
    await this.communityLink.click();
  }
  
  /**
   * Open search dialog
   */
  async openSearch() {
    await this.searchButton.click();
  }
  
  /**
   * Verify navigation is visible
   */
  async expectVisible() {
    await this.docsLink.waitFor({ state: 'visible' });
  }
}
