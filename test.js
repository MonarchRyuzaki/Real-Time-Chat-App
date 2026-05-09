/**
 * Fetches, enriches, and sorts donations using a hybrid model.
 * @param {object} queryParams - User search criteria (location, preferences, etc.).
 * @returns {Array} A paginated list of the most relevant donations.
 */
async function hybridRankAndPaginate(queryParams) {
    // 1. Candidate Retrieval: Fetch a lean list of candidate IDs and distances
    // that match semantic and geo filters from the SPARQL backend.
    const candidates = await sparqlService.fetchCandidateDonations(queryParams);
  
    // 2. Data Enrichment: Fetch the full metadata for these candidates
    // from the ancillary MongoDB store.
    const candidateIds = candidates.map(c => c.mongoId);
    const fullDonations = await mongoService.getDonationsByIds(candidateIds);
  
    // Merge the distance data into the full donation objects.
    const enrichedDonations = mergeData(fullDonations, candidates);
  
    // 3. Application-Layer Sorting: The core hybrid ranking logic.
    const sortedDonations = enrichedDonations.sort((a, b) => {
      // Primary Sort: User-specified food type preferences.
      const aIsPreferred = hasPreferredType(a, queryParams.prefersFoodType);
      const bIsPreferred = hasPreferredType(b, queryParams.prefersFoodType);
      if (aIsPreferred !== bIsPreferred) return aIsPreferred ? -1 : 1;
  
      // Secondary Sort: Geographic distance (nearest first).
      if (a.distanceKm !== b.distanceKm) return a.distanceKm - b.distanceKm;
  
      // Tertiary Sort: Donation priority (High > Medium > Low).
      const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
      if (a.priority !== b.priority) return priorityOrder[b.priority] - priorityOrder[a.priority];
  
      // Quaternary Sort: Expiration date (earliest expiring first).
      if (a.expiryDate !== b.expiryDate) return new Date(a.expiryDate) - new Date(b.expiryDate);
  
      // Final Tie-Breaker: Creation date (newest first).
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  
    // 4. Pagination: Only after the comprehensive sort is the final
    // list sliced to return the requested page.
    return applyPagination(sortedDonations, queryParams.page, queryParams.pageSize);
  }