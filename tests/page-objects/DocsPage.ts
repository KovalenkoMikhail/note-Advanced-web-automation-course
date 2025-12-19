import { Page, Locator, expect } from '@playwright/test';
import { TopNavigationComponent } from '../page-components/TopNavigationComponent';

/**
 * DocsPage - Page Object for Playwright documentation page
 * Demonstrates composition and page-specific business logic
 */
export class DocsPage {
  readonly page: Page;
  readonly url = 'https://playwright.dev/docs/intro';
  
  // Components
  readonly topNav: TopNavigationComponent;
  
  // Page-specific locators
  readonly pageTitle: Locator;
  readonly sidebar: Locator;
  readonly searchInput: Locator;
  readonly installationSection: Locator;
  
  constructor(page: Page) {
    this.page = page;
    
    // Compose navigation
    this.topNav = new TopNavigationComponent(page);
    
    // Initialize locators
    this.pageTitle = page.getByRole('heading', { name: 'Installation' });
    this.sidebar = page.getByRole('navigation').first();
    this.searchInput = page.getByPlaceholder('Search docs');
    this.installationSection = page.locator('text=Get started by installing Playwright');
  }
  
  /**
   * Navigate to docs page
   */
  async goto() {
    await this.page.goto(this.url);
  }
  
  /**
   * Verify docs page loaded
   */
  async expectLoaded() {
    await expect(this.pageTitle).toBeVisible();
    await expect(this.sidebar).toBeVisible();
  }
  
  /**
   * Search documentation
   */
  async search(query: string) {
    await this.searchInput.click();
    await this.searchInput.fill(query);
    await this.searchInput.press('Enter');
  }
  
  /**
   * Navigate to section in sidebar
   */
  async navigateToSection(sectionName: string) {
    await this.sidebar.getByRole('link', { name: sectionName }).click();
  }
}
