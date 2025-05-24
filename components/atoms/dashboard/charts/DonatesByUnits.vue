<template>
  <ClientOnly>
    <div>
      <h3 class="text-2xl font-bold mb-4">Doações Entregues por Unidade - Mitra Arquidiocesana de São Paulo - Setor Brasilândia - Decanato Santa Isabel e São Zacarias - 2025</h3>
      <apexchart
        :key="series"
        height="300"
        width="100%"
        :options="options"
        :series="series"
      ></apexchart>
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        @click="updateChart"
      >
        Change
      </button>
    </div>
  </ClientOnly>
  </template>
  <script setup lang="ts">
  const options = ref<any>({
    chart: {
      width: '100%',
      height: '100%',
      type: 'pie',
    },
    labels: [
      "Nossa Senhora de Fátima - Vila Bonilha", 
      "Nossa Senhora das Dores - Sítio Morro Grande",
      "Cristo Libertador",
      "Santa Terezinha do Menino Jesus - Jardim Sidney",
      "Nossa Senhor do Retiro",
      "São Luis Gonzaga - Vila Pereira Barreto",
      "Bom Jesus dos Passos - Freguesia do Ó",
      "São Judas Tadeu - Vila Miriam",
      "Nossa Senhora Aparecida - Vila Zat",
      "Santa Rita de Cássia - Vila Progresso"
    ],
      colors: [
        "#008FFB",
        "#00E396",
        "#00EBFF",
        "#FF4560",
        "#775DD0",
        "#546E7A",
        "#26a69a",
        "#d4526e",
        "#f3b600",
        "#fb5ffb"
      ],
    theme: {
      monochrome: {
        enabled: false,
      }
    },
    plotOptions: {
      pie: {
        dataLabels: {
          offset: -5,
        },
      },
    },
    grid: {
      padding: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
    },
    legend: {
      show: true
    }
  });
  const series = ref<any>([]);
  const labels = ref<any>([])
  const updateChart = () => {
  
    options.value = {
      ...options.value,
    }
    series.value = [ 111, 80, 97, 55, 28, 91, 104, 120, 40, 60 ];
    labels.value = [
      "Nossa Senhora de Fátima - Vila Bonilha", 
      "Nossa Senhora das Dores - Sítio Morro Grande",
      "Cristo Libertador",
      "Santa Terezinha do Menino Jesus - Jardim Sidney",
      "Nossa Senhor do Retiro",
      "São Luis Gonzaga - Vila Pereira Barreto",
      "Bom Jesus dos Passos - Freguesia do Ó",
      "São Judas Tadeu - Vila Miriam",
      "Nossa Senhora Aparecida - Vila Zat",
      "Santa Rita de Cássia - Vila Progresso"
    ]
  };
  onMounted(() => {
    updateChart();
  });
  </script>
  
  