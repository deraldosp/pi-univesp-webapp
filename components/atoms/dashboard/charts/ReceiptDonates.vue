<template>
    <ClientOnly>

      <div>
        <h4 class="text-2xl font-bold mb-4">Doações Recebidas - Nossa Senhora de Fátima - Vila Bonilha</h4>
        <apexchart
          :key="series"
          height="260"
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
      type: "area",
      zoom: {
        enabled: true
      }
    }
    
  });
  const series = ref<any>([{
            name: "Doações",
            data: []
          }]);
  const updateChart = () => {
    const data = [ 15, 18, 10, 19, 22 ]
  
    options.value = {
      ...options.value,
      xaxis: {
        categories: ["Jan/25", "Fev/25", "Mar/25", "Abr/25", "Mai/25"],
      },
    };
    series.value = [
      {
        name: "Doações",
        data: data,
      },
    ];
  };
  onMounted(() => {
    updateChart();
  });
  </script>
  
  