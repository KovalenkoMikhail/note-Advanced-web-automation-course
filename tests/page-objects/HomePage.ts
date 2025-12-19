import { Page, Locator, expect } from '@playwright/test';
import { TopNavigationComponent } from '../page-components/TopNavigationComponent';

/**
 * HomePage - Page Object for Playwright homepage
 * Demonstrates OOP composition by using TopNavigationComponent
 */
export class HomePage {
  readonly page: Page;
  readonly url = 'https://playwright.dev';
  
  // Components (composition)
  readonly topNav: TopNavigationComponent;
  
  // Page-specific locators
  readonly pageHeading: Locator;
  readonly getStartedButton: Locator;
  readonly installationCommand: Locator;
  readonly featuresSection: Locator;
  
  constructor(page: Page) {
    this.page = page;
    
    // Compose TopNavigationComponent
    this.topNav = new TopNavigationComponent(page);
    
    // Initialize page-specific locators
    this.pageHeading = page.getByRole('heading', { name: 'Playwright enables', level: 1 });
    this.getStartedButton = page.getByRole('link', { name: 'Get started' });
    this.installationCommand = page.locator('text=npm init playwright@latest');
    this.featuresSection = page.locator('text=Any browser');
  }
  
  /**
   * Navigate to home page
   */
  async goto() {
    await this.page.goto(this.url);
  }
  
  /**
   * Verify page loaded correctly
   */
  async expectLoaded() {
    await expect(this.pageHeading).toBeVisible();
  }
  
  /**
   * Click Get Started button
   */
  async clickGetStarted() {
    await this.getStartedButton.click();
  }
  
  /**
   * Verify installation command is visible
   */
  async expectInstallationVisible() {
    await expect(this.installationCommand).toBeVisible();
  }
}
