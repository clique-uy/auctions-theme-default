"use client";

import Link from "next/link";
import { Search as SearchIcon } from "lucide-react";
import type { FormEvent } from "react";
import type { SearchViewThemeProps } from "@/components/theme/types";
import { themeViews } from "@/components/theme/registry";

export default function Search({
  query,
  onQueryChange,
  loading,
  loadError,
  empty,
  resultsTitle,
  items,
}: SearchViewThemeProps) {
  const LotGrid = themeViews.LotGrid;
  const ready = !loading && !loadError;
  const hasQuery = query.trim().length > 0;

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <div id="search" className="theme-search">
      <section id="search-heading" className="theme-search__intro">
        <div className="theme-search__intro-inner">
          <p className="theme-search__eyebrow">Search</p>
          <h1 className="theme-search__title">
            {hasQuery ? `Results for “${query.trim()}”` : "Search lots"}
          </h1>
          <p className="theme-search__description">
            {hasQuery
              ? "Lots matching your search."
              : "Find lots by name, number, or auction."}
          </p>
          <form className="theme-search__field" onSubmit={onSubmit} role="search">
            <label className="theme-search__query">
              <SearchIcon aria-hidden="true" />
              <span className="sr-only">Search lots</span>
              <input
                id="search-query"
                type="search"
                value={query}
                onChange={(event) => onQueryChange(event.target.value)}
                placeholder="Search for items, categories or keywords"
                autoComplete="off"
                autoFocus
              />
            </label>
            <button className="theme-search__submit" type="submit">
              Search
            </button>
          </form>
        </div>
      </section>

      <div id="search-content" className="theme-search__body">
        {loading ? (
          <div className="theme-search__status" role="status">Loading lots…</div>
        ) : null}

        {!loading && loadError ? (
          <div className="theme-search__status is-error" role="alert">{loadError}</div>
        ) : null}

        {ready && items.length === 0 ? (
          <section className="theme-search__empty" aria-live="polite">
            <SearchIcon aria-hidden="true" />
            <h2>{empty.title}</h2>
            <p>{empty.description}</p>
            <Link href={empty.ctaHref}>{empty.ctaLabel}</Link>
          </section>
        ) : null}

        {ready && items.length > 0 ? (
          <LotGrid
            context="wishlist"
            title={resultsTitle}
            meta={`${items.length} ${items.length === 1 ? "lot" : "lots"}`}
            items={items}
          />
        ) : null}
      </div>
    </div>
  );
}
