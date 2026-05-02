import type {ClickStats, StatsLink} from "@/types";

export function exportToCSV(statsLink: StatsLink, stats: ClickStats): void {
  const rows = [
    ['Timestamp', 'Country', 'Device', 'Browser'],
    ...stats.recentClicks.map((click) => [
      click.timestamp,
      click.country ?? 'Unknown',
      click.device,
      click.browser ?? 'Unknown',
    ]),
  ]

  const csv = rows.map((row) => row.join(',')).join('\n')
  const blob = new Blob([csv], {type: 'text/csv'})
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${statsLink.code}-analytics.csv`
  a.click()
  URL.revokeObjectURL(url)
}
