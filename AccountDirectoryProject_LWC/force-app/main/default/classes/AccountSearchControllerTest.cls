/**
 * @description Test class for AccountSearchController.
 *              Covers the default ascending sort, descending sort, and the whitelist
 *              fallback that protects the dynamic ORDER BY clause from invalid input.
 */
@isTest
private class AccountSearchControllerTest {

    /**
     * @description Seeds three accounts with names chosen so ascending vs. descending
     *              alphabetical order is unambiguous to assert against (Alpha < Beta < Zeta).
     *              Runs once per test class; the data is shared and rolled back automatically
     *              across every @isTest method below.
     */
    @TestSetup
    static void setupTestData() {
        List<Account> testAccounts = new List<Account>();
        testAccounts.add(new Account(Name = 'Zeta Corp', Industry = 'Technology', Phone = '555-0101'));
        testAccounts.add(new Account(Name = 'Alpha Systems', Industry = 'Energy', Phone = '555-0102'));
        testAccounts.add(new Account(Name = 'Beta Bakery', Industry = 'Food', Phone = '555-0103'));

        insert testAccounts;
    }

    /**
     * @description Verifies that the default ascending sort returns every seeded account,
     *              with the alphabetically first one ('Alpha Systems') leading the list.
     */
    @isTest
    static void testSearchAccountsDefaultSort() {
        Test.startTest();
        List<Account> results = AccountSearchController.searchAccounts('', 'Name', 'ASC');
        Test.stopTest();

        System.assertEquals(3, results.size(), 'Should return all test accounts');
        System.assertEquals('Alpha Systems', results[0].Name, 'First account should be Alpha Systems based on ASC sort');
    }

    /**
     * @description Verifies that requesting a descending sort reverses the order, so the
     *              alphabetically last account ('Zeta Corp') comes first.
     */
    @isTest
    static void testSearchAccountsDescendingSort() {
        Test.startTest();
        List<Account> results = AccountSearchController.searchAccounts('', 'Name', 'DESC');
        Test.stopTest();

        System.assertEquals('Zeta Corp', results[0].Name, 'First account should be Zeta Corp based on DESC sort');
    }

    /**
     * @description Security regression test: a sort field outside the whitelist — as an
     *              attacker attempting SOQL injection might send — must never reach the query
     *              string. It should silently fall back to the default safe sort (Name ASC).
     */
    @isTest
    static void testSearchAccountsInvalidSortFieldFallback() {
        Test.startTest();
        // Simulates a malicious or simply invalid field name coming from the client.
        List<Account> results = AccountSearchController.searchAccounts('', 'Invalid_Field__c', 'ASC');
        Test.stopTest();

        System.assertEquals('Alpha Systems', results[0].Name, 'Should fallback to sorting by Name ASC');
    }
}