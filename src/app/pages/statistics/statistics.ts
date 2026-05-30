import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { NgxEchartsModule } from 'ngx-echarts';
import type { EChartsOption } from 'echarts';

interface OverviewCard {
  label: string;
  value: string;
  sub: string;
  delta: string;
  positive: boolean;
  icon: string;
  iconBg: string;
  iconColor: string;
}

interface StatRow {
  icon: string;
  iconBg: string;
  iconColor: string;
  label: string;
  value: string;
  sub: string;
}

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    NgxEchartsModule,
  ],
  templateUrl: './statistics.html',
  styleUrl: './statistics.scss',
})
export class Statistics implements OnInit {
  selectedSeason = '2023/24';
  selectedCompetition = 'all';

  overviewCards: OverviewCard[] = [
    {
      label: 'Matches Played',
      value: '28',
      sub: 'W15 D8 L5',
      delta: '+3.2%',
      positive: true,
      icon: 'emoji_events',
      iconBg: '#e3f2fd',
      iconColor: '#1565c0',
    },
    {
      label: 'Goals Scored',
      value: '52',
      sub: '1.86 per match',
      delta: '+8.1%',
      positive: true,
      icon: 'sports_soccer',
      iconBg: '#e8f5e9',
      iconColor: '#2e7d32',
    },
    {
      label: 'Goals Conceded',
      value: '23',
      sub: '0.82 per match',
      delta: '+2.3%',
      positive: false,
      icon: 'security',
      iconBg: '#ffebee',
      iconColor: '#c62828',
    },
    {
      label: 'Expected Goals (xG)',
      value: '48.3',
      sub: '1.73 per match',
      delta: '+5.7%',
      positive: true,
      icon: 'trending_up',
      iconBg: '#f3e5f5',
      iconColor: '#6a1b9a',
    },
  ];

  attackingStats: StatRow[] = [
    {
      icon: 'sports',
      iconBg: '#fff3e0',
      iconColor: '#e65100',
      label: 'Shots per Match',
      value: '14.2',
      sub: 'League avg: 12.8',
    },
    {
      icon: 'sports_soccer',
      iconBg: '#e8f5e9',
      iconColor: '#2e7d32',
      label: 'Shots on Target',
      value: '6.8',
      sub: '47.9% accuracy',
    },
    {
      icon: 'star',
      iconBg: '#e3f2fd',
      iconColor: '#1565c0',
      label: 'Big Chances Created',
      value: '3.4',
      sub: 'League avg: 2.9',
    },
    {
      icon: 'assistant',
      iconBg: '#f3e5f5',
      iconColor: '#6a1b9a',
      label: 'Expected Assists',
      value: '42.7',
      sub: '1.53 per match',
    },
  ];

  defensiveStats: StatRow[] = [
    {
      icon: 'swap_horiz',
      iconBg: '#e8eaf6',
      iconColor: '#283593',
      label: 'Interceptions',
      value: '11.8',
      sub: 'League avg: 10.2',
    },
    {
      icon: 'security',
      iconBg: '#ffebee',
      iconColor: '#c62828',
      label: 'Tackles Won',
      value: '15.3',
      sub: '68.2% success',
    },
    {
      icon: 'compress',
      iconBg: '#fff8e1',
      iconColor: '#f57f17',
      label: 'Pressures Applied',
      value: '142.7',
      sub: 'League avg: 128.4',
    },
    {
      icon: 'pan_tool',
      iconBg: '#e0f7fa',
      iconColor: '#00838f',
      label: 'Defensive Duels Won',
      value: '8.9',
      sub: '71.4% success',
    },
  ];

  possessionStats: StatRow[] = [
    {
      icon: 'percent',
      iconBg: '#e8f5e9',
      iconColor: '#2e7d32',
      label: 'Possession %',
      value: '58.3%',
      sub: 'League avg: 52.1%',
    },
    {
      icon: 'adjust',
      iconBg: '#e3f2fd',
      iconColor: '#1565c0',
      label: 'Pass Accuracy',
      value: '84.7%',
      sub: '486 per match',
    },
    {
      icon: 'trending_up',
      iconBg: '#f3e5f5',
      iconColor: '#6a1b9a',
      label: 'Progressive Passes',
      value: '67.4',
      sub: 'League avg: 58.9',
    },
    {
      icon: 'flag',
      iconBg: '#fff3e0',
      iconColor: '#e65100',
      label: 'Final Third Entries',
      value: '42.8',
      sub: 'League avg: 38.2',
    },
  ];

  goalsTrendOption: EChartsOption = {};
  barChartOption: EChartsOption = {};

  ngOnInit(): void {
    this.buildGoalsTrend();
    this.buildBarChart();
  }

  private buildGoalsTrend(): void {
    this.goalsTrendOption = {
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#fff',
        borderColor: '#e0e0e0',
        textStyle: { color: '#212121', fontSize: 12 },
      },
      legend: {
        data: ['Goals Scored', 'Goals Conceded'],
        top: 0,
        left: 0,
        textStyle: { fontSize: 12, color: '#616161' },
        icon: 'circle',
        itemWidth: 10,
        itemHeight: 10,
      },
      grid: { top: 32, left: 32, right: 16, bottom: 24, containLabel: false },
      xAxis: {
        type: 'category',
        data: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
        axisLine: { lineStyle: { color: '#e0e0e0' } },
        axisTick: { show: false },
        axisLabel: { fontSize: 11, color: '#9e9e9e' },
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: 4,
        interval: 1,
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: '#f5f5f5' } },
        axisLabel: { fontSize: 11, color: '#9e9e9e' },
      },
      series: [
        {
          name: 'Goals Scored',
          type: 'line',
          data: [2, 3, 1, 4, 2, 2, 3, 1],
          smooth: true,
          lineStyle: { color: '#2e7d32', width: 2 },
          itemStyle: { color: '#2e7d32' },
          symbol: 'circle',
          symbolSize: 6,
        },
        {
          name: 'Goals Conceded',
          type: 'line',
          data: [1, 1, 0, 2, 1, 0, 1, 1],
          smooth: true,
          lineStyle: { color: '#c62828', width: 2 },
          itemStyle: { color: '#c62828' },
          symbol: 'circle',
          symbolSize: 6,
        },
      ],
    };
  }

  private buildBarChart(): void {
    this.barChartOption = {
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#fff',
        borderColor: '#e0e0e0',
        textStyle: { color: '#212121', fontSize: 12 },
        axisPointer: { type: 'shadow' },
      },
      legend: {
        data: ['Our Team', 'League Average'],
        top: 0,
        left: 0,
        textStyle: { fontSize: 12, color: '#616161' },
        icon: 'rect',
        itemWidth: 12,
        itemHeight: 12,
      },
      grid: { top: 32, left: 40, right: 16, bottom: 24, containLabel: false },
      xAxis: {
        type: 'category',
        data: ['Shots/Match', 'Pass Accuracy', 'Possession %', 'Tackles Won', 'Big Chances'],
        axisLine: { lineStyle: { color: '#e0e0e0' } },
        axisTick: { show: false },
        axisLabel: { fontSize: 11, color: '#9e9e9e' },
      },
      yAxis: {
        type: 'value',
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: '#f5f5f5' } },
        axisLabel: { fontSize: 11, color: '#9e9e9e' },
      },
      series: [
        {
          name: 'Our Team',
          type: 'bar',
          data: [14.2, 84.7, 58.3, 15.3, 3.4],
          itemStyle: { color: '#3949ab', borderRadius: [4, 4, 0, 0] },
          barMaxWidth: 40,
        },
        {
          name: 'League Average',
          type: 'bar',
          data: [12.8, 79.2, 52.1, 13.8, 2.9],
          itemStyle: { color: '#e0e0e0', borderRadius: [4, 4, 0, 0] },
          barMaxWidth: 40,
        },
      ],
    };
  }
}
