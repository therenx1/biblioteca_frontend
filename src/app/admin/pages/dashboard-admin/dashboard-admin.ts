import { Component, ViewChild, AfterViewInit, ElementRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrabajadorService } from '../../../service/trabajador/trabajador-service';
import { Trabajador } from '../../../models/trabajador/trabajador';
import {
  Chart,
  ArcElement,
  DoughnutController,
  Tooltip,
  Legend,
  Title
} from 'chart.js';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-admin.html',
  styleUrls: ['./dashboard-admin.css']
})
export class DashboardAdminComponent implements OnInit, AfterViewInit {

  private trabajadorService = inject(TrabajadorService);

  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  private chart: Chart | null = null;

  numBibliotecarios: number = 0;
  numAuxiliares: number = 0;
  sesionesActivas: number = 1;

  ngOnInit(): void {
    this.cargarDatosDashboard();
  }

  ngAfterViewInit(): void {
    Chart.register(ArcElement, DoughnutController, Tooltip, Legend, Title);
  }

  cargarDatosDashboard(): void {
    this.trabajadorService.listarTodos().subscribe({
      next: (trabajadores: Trabajador[]) => {
        this.numBibliotecarios = trabajadores.filter(t => t.rol?.roles === 'Bibliotecario').length;
        this.numAuxiliares = trabajadores.filter(t => t.rol?.roles === 'Auxiliar de Biblioteca').length;

        this.crearGrafico();
      },
      error: (err) => {
        console.error('Error al cargar datos del dashboard:', err);
        this.numBibliotecarios = 0;
        this.numAuxiliares = 0;
        this.crearGrafico();
      }
    });
  }

  crearGrafico(): void {
    if (this.chart) {
      this.chart.destroy();
    }

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Bibliotecarios', 'Auxiliares'],
        datasets: [{
          data: [this.numBibliotecarios, this.numAuxiliares],
          backgroundColor: ['#f0963a', '#909091'],
          hoverBackgroundColor: ['#d67e2a', '#787878'],
          borderWidth: 3,
          borderColor: '#1e1e1f'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: 'white',
              padding: 20,
              font: {
                size: 14
              }
            }
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || '';
                const value = context.parsed || 0;
                const total = this.numBibliotecarios + this.numAuxiliares;
                const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
                return `${label}: ${value} (${percentage}%)`;
              }
            }
          }
        }
      }
    });
  }
}