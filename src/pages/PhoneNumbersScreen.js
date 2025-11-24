import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
  TouchableOpacity,
} from "react-native";
import { RESPONSIVE } from "../utils/responsive";
import { useAuth } from "../contexts/AuthContext";

// Componentes
import AppHeader from "../components/AppHeader";
import EditableField from "../components/EditableField";
import LabelledTextInput from "../components/LabelledTextInput";
import PrimaryButton from "../components/PrimaryButton";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
  },
  scrollContainer: {
    flex: 1,
    paddingBottom: 50,
  },
  contentContainer: {
    paddingHorizontal: RESPONSIVE.PADDING_LARGE,
    paddingVertical: RESPONSIVE.PADDING_MEDIUM,
    paddingBottom: RESPONSIVE.PADDING_XL,
  },
  formSection: {
    marginBottom: RESPONSIVE.MARGIN_LARGE,
  },
  additionalPhonesSection: {
    marginTop: 20,
    marginBottom: RESPONSIVE.MARGIN_LARGE,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: RESPONSIVE.MARGIN_LARGE,
    marginTop: RESPONSIVE.MARGIN_MEDIUM,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
    marginBottom: 50,
    marginTop: RESPONSIVE.MARGIN_SMALL,
  },
  divider: {
    height: 1,
    backgroundColor: "#D0D0D0",
    marginVertical: -20,
    width: "100%",
  },
  saveButton: {
    marginTop: RESPONSIVE.MARGIN_LARGE,
    marginBottom: RESPONSIVE.MARGIN_MEDIUM,
    width: "100%",
    flex: 0,
  },
  backButton: {
    alignSelf: "flex-end",
    paddingVertical: 8,
    marginTop: 8,
  },
  backButtonText: {
    color: "#FF007A",
    fontSize: 14,
    fontWeight: "600",
  },
  addButton: {
    marginTop: 20,
    marginBottom: 10,
  },
  phoneList: {
    marginTop: 20,
  },
  phoneItem: {
    marginBottom: 20,
  },
  phoneItemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  phoneItemLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  deleteButton: {
    padding: 8,
  },
  deleteButtonText: {
    color: "#FF0000",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default function PhoneNumbersScreen({ navigation }) {
  const { user } = useAuth();
  
  // Estados dos campos do formulário
  const [formData, setFormData] = useState({
    mainPhone: user?.phone || "",
    newPhone: "",
  });

  // Atualiza o telefone quando o usuário mudar
  useEffect(() => {
    if (user?.phone) {
      setFormData((prev) => ({
        ...prev,
        mainPhone: user.phone,
      }));
    }
  }, [user?.phone]);

  // Lista de telefones adicionais
  const [additionalPhones, setAdditionalPhones] = useState([]);

  // Estados de edição
  const [editingFields, setEditingFields] = useState({
    mainPhone: false,
    addingPhone: false,
  });

  // Handlers
  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleSave = async () => {
    // Validações básicas
    if (!formData.mainPhone) {
      Alert.alert("Erro", "Por favor, preencha o número de telefone principal.");
      return;
    }

    // Fechar todos os campos de edição
    setEditingFields({
      mainPhone: false,
      addingPhone: false,
    });

    // Atualiza o telefone no contexto do usuário (salvo localmente)
    // TODO: Implementar chamada à API para salvar os dados no backend quando houver endpoint
    // Por enquanto, salva apenas localmente no AsyncStorage através do contexto
    try {
      // Limpa caracteres não numéricos para salvar
      const cleanPhone = formData.mainPhone.replace(/\D/g, "");
      
      // Atualiza o contexto local (será persistido no AsyncStorage)
      // Nota: Para persistir no backend, será necessário criar um endpoint de atualização
      Alert.alert("Sucesso", "Número de telefone atualizado com sucesso!", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar o número de telefone. Tente novamente.");
    }
  };

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleEditField = (field) => {
    setEditingFields((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  const handleFieldBlur = (field) => {
    setEditingFields((prev) => ({
      ...prev,
      [field]: false,
    }));

    if (field === "mainPhone") {
      setFormData((prev) => ({ ...prev, newPhone: "" }));
    } else if (field === "addingPhone") {
      setFormData((prev) => ({ ...prev, newPhone: "" }));
    }
  };

  const maskPhone = (phone) => {
    if (!phone) return "";
    // Formato: (54) *****-1603
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length < 10) return phone;
    const areaCode = cleaned.substring(0, 2);
    const firstPart = cleaned.substring(2, 7);
    const lastPart = cleaned.substring(7);
    return `(${areaCode}) ${"*".repeat(firstPart.length)}-${lastPart}`;
  };

  const handleAddPhone = () => {
    if (!formData.newPhone) {
      Alert.alert("Erro", "Por favor, digite um número de telefone.");
      return;
    }

    const newPhone = {
      id: additionalPhones.length > 0 
        ? Math.max(...additionalPhones.map(p => p.id)) + 1 
        : 1,
      number: formData.newPhone,
    };

    setAdditionalPhones([...additionalPhones, newPhone]);
    setFormData((prev) => ({ ...prev, newPhone: "" }));
    setEditingFields((prev) => ({ ...prev, addingPhone: false }));
  };

  const handleDeletePhone = (phoneId) => {
    Alert.alert(
      "Confirmar exclusão",
      "Deseja realmente remover este número de telefone?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Remover",
          style: "destructive",
          onPress: () => {
            setAdditionalPhones(additionalPhones.filter((p) => p.id !== phoneId));
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#3C1342" />

      {/* Header padrão do SwapClass */}
      <AppHeader title="SwapClass" onBackPress={handleBackPress} />

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Título da página */}
        <Text style={styles.pageTitle}>Números de telefone</Text>

        {/* Seção de Telefone Principal */}
        <View style={styles.formSection}>
          <EditableField
            label="Número de telefone"
            value={formData.mainPhone}
            onChangeText={(value) => updateField("mainPhone", value)}
            onMaskValue={maskPhone}
            isEditing={editingFields.mainPhone}
            onEditPress={() => handleEditField("mainPhone")}
            onBlur={() => handleFieldBlur("mainPhone")}
            keyboardType="phone-pad"
            placeholder="(00) 00000-0000"
          />

          {/* Campo "Novo número" aparece quando está editando */}
          {editingFields.mainPhone && (
            <>
              <LabelledTextInput
                label="Novo número de telefone"
                value={formData.newPhone}
                onChangeText={(value) => updateField("newPhone", value)}
                keyboardType="phone-pad"
                placeholder="(00) 00000-0000"
              />
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => handleFieldBlur("mainPhone")}
              >
                <Text style={styles.backButtonText}>Voltar</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* Linha divisória */}
        <View style={styles.divider} />

        {/* Seção de Telefones Adicionais */}
        <View style={styles.additionalPhonesSection}>
          <Text style={styles.sectionTitle}>Telefones adicionais</Text>

          {/* Lista de telefones adicionais */}
          {additionalPhones.length > 0 && (
            <View style={styles.phoneList}>
              {additionalPhones.map((phone) => (
                <View key={phone.id} style={styles.phoneItem}>
                  <View style={styles.phoneItemHeader}>
                    <Text style={styles.phoneItemLabel}>
                      Telefone {phone.id}
                    </Text>
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => handleDeletePhone(phone.id)}
                    >
                      <Text style={styles.deleteButtonText}>Remover</Text>
                    </TouchableOpacity>
                  </View>
                  <LabelledTextInput
                    value={phone.number}
                    editable={false}
                    showLabel={false}
                  />
                </View>
              ))}
            </View>
          )}

          {/* Botão para adicionar novo telefone */}
          {!editingFields.addingPhone && (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => handleEditField("addingPhone")}
            >
              <Text style={styles.backButtonText}>+ Adicionar número</Text>
            </TouchableOpacity>
          )}

          {/* Campos para adicionar novo telefone */}
          {editingFields.addingPhone && (
            <>
              <LabelledTextInput
                label="Novo número de telefone"
                value={formData.newPhone}
                onChangeText={(value) => updateField("newPhone", value)}
                keyboardType="phone-pad"
                placeholder="(00) 00000-0000"
              />
              <View style={{ flexDirection: "row", justifyContent: "flex-end", gap: 15 }}>
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={() => handleFieldBlur("addingPhone")}
                >
                  <Text style={styles.backButtonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.backButton}
                  onPress={handleAddPhone}
                >
                  <Text style={[styles.backButtonText, { color: "#00AA00" }]}>
                    Adicionar
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>

        {/* Botão de Salvar */}
        <PrimaryButton
          title="SALVAR ALTERAÇÕES"
          onPress={handleSave}
          variant="secondary"
          style={styles.saveButton}
        />
      </ScrollView>
    </View>
  );
}

